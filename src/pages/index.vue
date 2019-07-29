<template lang="pug">
.div.allWrap
  p >> AllCheckers
  p {{ this.allCheckers }}
  p >> 選択された筋肉（部位ごと）
  p {{ this.checkedMusclesByParts }}
  template(v-for="part in this.menu")
    .partWrap
      span.part 【部位】{{ part.bodyPartsName }}
      p
        input(
          type="checkbox"
          @click="allCheckers[part.bodyPartsName].check()"
        )
        span すべての筋肉を選択
        template(v-for="muscle in part.muscles")
          p
            input(
              type="checkbox"
              :value="muscle"
              v-model="checkedMusclesByParts[part.bodyPartsName]"
            )
            span {{ muscle }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import {
ITrainingMenu
} from '../interfaces/menu'

@Component
export default class extends Vue {

  // store からデータを取得
  public get menu(): ITrainingMenu[] | null {
    return this.$store.state.training.menu
  }

  // 選択された筋肉の一覧
  public checkedMusclesByParts = {}

  //「すべての筋肉を選択する」を実行する allChecker を、全ての部位について集めたもの
  public allCheckers = {}

  // 「すべての筋肉を選択する」を実行する allChecker を作成する.
  public createAllChecker(partsName: string) {
    // 選択されているかどうかのフラグ
    let isChecked = false
    // 指定したパーツにおける全ての筋肉のリスト
    const allMuscles = _.find(this.menu, ['bodyPartsName', partsName]).muscles

    return {
      // check 関数はクロージャ
      check: (): void => {

        // チェックなし -> チェックあり：要素の追加
        if (!isChecked) {
          const diff = _.difference(
            allMuscles,
            this.checkedMusclesByParts[partsName]
          )
          this.checkedMusclesByParts[partsName].push(...diff)

        // チェックあり -> チェックなし：要素の削除
        } else {
          this.checkedMusclesByParts[partsName] = _.without(
            this.checkedMusclesByParts[partsName],
            ...allMuscles
          )
        }

        // 最後にチェックをつける/はずす
        isChecked = !isChecked
      }
    }
  }

  // ライフサイクル
  public async mounted() {
    // トレーニングデータを取得
    await this.$store.dispatch('training/fetchTrainingMenu', {})

    _.forEach(this.menu, (parts) => {
      // allChecker を部位ごとに作成
      this.$set(
        this.allCheckers,
        parts.bodyPartsName,
        this.createAllChecker(parts.bodyPartsName)
      )

      // 「選択された筋肉一覧」を部位ごとに作成
      this.$set(
        this.checkedMusclesByParts,
        parts.bodyPartsName,
        []
      )
    })
  }
}
</script>

<style>
.allWrap {
  font-size: 20px;
  padding: 20px 20px 0;
  margin: 20px auto 20px;
}
.partWrap {
  margin: 20px;
}
.part {
  font-size: 22px;
  color: blue
}
span {
  padding: 0 0 0 10px;
}
</style>
