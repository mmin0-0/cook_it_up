import axios from 'axios';
import { createStore } from 'vuex';
import { Food as IFood } from '@/types/food';
import createPersistedState from 'vuex-persistedstate';

export interface State {
  foods: IFood[];
  allFoods: IFood[];
  searchQuery: string;
  savedFoods: IFood[];
}

function cleanSorting(text: string):string { // 데이터 균일화
  return text
  .replace(/인분|컵|송송 썬|불린 것|줄기부분|삶은것|주재료|주 재료|육수|마른것|양념|다진|부순|뿌리|으깬|데친|두 가지 색|재료|갈은것|다진것|개|적당량|소스|소스소개/g, '')
  .replace(/로즈마리/g, '셰프리')
  .replace(/마리/g, '')
  .replace(/셰프리/g, '로즈마리')
  .replace(/낙지 다리/g, '낙지')
  .replace(/두부강된장 참기름/g, '강된장')
  .replace(/파인애플 통조림/g, '파인애플');
}

function manualStepList(obj: any):string[] { // 조리방법
  return Array.from({ length: 8 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    return obj[`MANUAL${num}`]?.replace(new RegExp(`${i + 1}\\.`), '').trim();
  }).filter(Boolean);
}

function manualImageList(obj: any): string[]{ // 조리방법 이미지
  return Array.from({length: 8}, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    return obj[`MANUAL_IMG${num}`];
  }).filter(Boolean);
}

export default createStore<State>({
  state: {
    foods: [],
    allFoods: [],
    searchQuery: '',
    savedFoods: [],
  },
  mutations: {
    setFoods(state, data: IFood[]) { // 실제데이터
    state.foods = data;
    },
    setAllFoods(state, data: IFood[]) { // api 호출 음식(999개)
      state.allFoods = data;
    },
    setSearchQuery(state, query:string){
      state.searchQuery = query;
    },
    setSavedFoods(state, foods: IFood[]){ //sessionStorage에 저장
      state.savedFoods = foods;
    }
  },
  actions: {
    async fetchFoods({commit, state}){
      if (state.allFoods.length > 0) return;

      try{
        const response = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/${process.env.VUE_APP_API_KEY}/COOKRCP01/json/1/999`);
        
        const reg = /([가-힣]{1,10}[ ][가-힣]{1,10}|[가-힣]{1,10})/g;
        const rows = response.data.COOKRCP01?.row || [];

        const cleanedData = rows.map((obj: any, idx: number) => {
          const cleanedItem = cleanSorting(obj.RCP_PARTS_DTLS);
          const manualSteps = manualStepList(obj);
          const manualImages = manualImageList(obj);

          return {
            id: idx,
            serialNum: obj.RCP_SEQ, //일련번호
            name: obj.RCP_NM, //요리이름
            hashtag: cleanedItem?.match(reg) || [], //해시태그
            cook: obj.RCP_WAY2, //조리방법
            cookItem: obj.RCP_PARTS_DTLS ? obj.RCP_PARTS_DTLS.split(',').map((item:string) => item.trim()) : [], //요리재료
            category: obj.RCP_PAT2, //요리종류(ex) 반찬, 국, 후식 등)
            mainImg: obj.ATT_FILE_NO_MAIN, //메인이미지
            tan: obj.INFO_CAR + 'g', //탄수화물
            dan: obj.INFO_PRO + 'g', //단백질
            ji: obj.INFO_FAT + 'g', //지방
            na: obj.INFO_NA + 'g', //나트륨
            calory: obj.INFO_ENG, //열량
            make: manualSteps, //조리방법
            makeImg: manualImages, //조리방법 이미지
          }
        });

        const previewFoods = cleanedData.slice(0, 15);
        commit('setAllFoods', cleanedData);
        commit('setFoods', previewFoods);

        // console.log('setFoods:', previewFoods);

      } catch(error){
        console.error('🍳 요리 데이터를 가져오는 중 오류 발생:', error);
      }
    },
    filterFoodsByQuery({commit, state}, query:string){
      const trimmedQuery = query.trim();
      commit('setSearchQuery', trimmedQuery);

      if (!trimmedQuery) {
        commit('setFoods', state.allFoods.slice(0, 15));
        return;
      }

      const filtered = state.allFoods.filter(food =>
        food.cookItem.some(item => item.includes(trimmedQuery))
      );

      commit('setFoods', filtered.slice(0, 15));
    }
  },
  getters: {
    foods: state => state.foods,
    allFoods: state => state.allFoods,
    searchQuery: state => state.searchQuery,
    savedFoods: state => state.savedFoods,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ['foods', 'allFoods', 'savedFoods']
    })
  ]
});
