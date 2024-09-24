import { Ring } from "@/domain/entities"

export interface RingsRepository {
    create(input: RingsRepository.Create.Input): RingsRepository.Create.Output
    findById(input: RingsRepository.FindById.Input): RingsRepository.FindById.Output
    update(input: RingsRepository.Update.Input): RingsRepository.Update.Output
    delete(input: RingsRepository.Delete.Input): RingsRepository.Delete.Output
    fetch(): RingsRepository.Fetch.Output
}

export namespace RingsRepository {
    export namespace Create {
        export type Input = {
            ringId?: string
            name: string
            power: string
            proprietor: string
            image: string
            forgerId: string
        }

        export type Output = Promise<Ring>
    }

    export namespace Update {
        export type Input = {
            ringId: string
            name?: string
            power?: string
            proprietor?: string
            image?: string
            forgerId?: string
        }

        export type Output = Promise<Ring>
    }

    export namespace Delete {
        export type Input = {
            ringId: string
        }

        export type Output = Promise<void>
    }

    export namespace FindById {
        export type Input = {
            ringId: string
        }

        export type Output = Promise<Ring | null>
    }

    export namespace Fetch {
        export type Input = null

        export type Output = Promise<Ring[]>
    }
}