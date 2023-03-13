export type CoOrds = [number, number]

export interface Checkpoint {
  id: number
  position: CoOrds
  isStart: boolean
  isFinish: boolean
}

export interface Race {
  id: string
  name: string
  distance: string
  checkpoints: Checkpoint[]
}
