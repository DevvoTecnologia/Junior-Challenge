import { useQuery } from 'react-query';
import { IAnel } from '../interfaces/IAnel';

export type AnelType = {
    genres: IAnel[]
}

export const useRings = () => {
    const { data, isLoading, error } = useQuery<IAnel[]>('genres', async () => {
        const res =  await fetch('http://localhost:3001/aneis/', {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            }
        })
        return res.json()
    },{
        retry:1,
    });

    return {
        data, isLoading, error
    }
};