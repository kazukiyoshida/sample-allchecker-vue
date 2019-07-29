import Vue from 'vue'
import axios from 'axios'
import {
ITrainingMenu
} from '../interfaces/menu'

export interface IState {
  menu: ITrainingMenu[] | null
}

export const state = (): IState => ({
  menu: null
})

export const getters = {
  getMenu(state: IState): ITrainingMenu[] | null {
    return state.menu
  }
}

export const mutations = {
  saveMenu(state: IState, menu: ITrainingMenu[]): void {
    state.menu = menu
  }
}

export const actions = {
  async fetchTrainingMenu(
    this: Vue,
    { state, commit }: any,
    payload: {}
  ): Promise<void> {
    console.log('>> fetchTrainingMenu')
    const { data } = await axios.get('http://localhost:3000/api/training')
    commit('saveMenu', data.menu)
  }
}
