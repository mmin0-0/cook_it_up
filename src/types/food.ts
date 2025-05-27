export type Food = {
  id: number; // 인덱스 기반 고유 ID
  serialNum: number, // RCP_SEQ //일련번호
  name: string; // RCP_NM (메뉴명)
  hashtag: string[]; // 정제된 해시태그 배열
  cook: string; // RCP_WAY2 (조리방법)
  cookItem: string[]; // RCP_PARTS_DTLS (재료 원본)
  category: string; // RCP_PAT2 (요리 종류)
  mainImg: string; // ATT_FILE_NO_MAIN (대표 이미지)
  tan: string;// INFO_CAR + "g" (탄수화물)
  dan: string; // INFO_PRO + "g" (단백질)
  ji: string; // INFO_FAT + "g" (지방)
  na: string; // INFO_NA + "mg" (나트륨)
  calory: string; // INFO_ENG (열량)
  make: string[]; // 조리 단계 텍스트 배열
  makeImg: string[]; // 조리 단계 이미지 배열
};
