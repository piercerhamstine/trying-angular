export interface Resource{
    id: string,
    name: string
}

export interface UseableResource{
    id: string,
    total: number
}

export interface GameAction{
    id: string,
    name: string,
    description: string,
    costs: UseableResource[],
    rewards: UseableResource[],
    unlocks: string[],
    unlocked: boolean,
    repeatable: boolean
}
