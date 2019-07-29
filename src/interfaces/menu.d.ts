/**
 * トレーニングメニュー API
 */
export interface ITrainingMenuList {
  // トレーニングメニュー
  menu: ITrainingMenu[]
}

export interface ITrainingMenu {
  // 身体の部位
  bodyPartsName: string
  // 筋肉の名称リスト
  muscles: string[]
}

