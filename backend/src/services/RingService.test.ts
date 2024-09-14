import RingService from './RingService';
import { AppDataSource } from '../data-source';

jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('RingService', () => {
  it('deve criar um anel com sucesso', async () => {
    const ringData = {
      name: 'Narya',
      power: 'Fogo',
      bearer: 'Gandalf',
      forgedBy: 'Elfos',
      image: 'narya.png',
    };

    const mockCount = jest.fn().mockResolvedValue(0);
    const mockSave = jest.fn().mockResolvedValue(ringData);
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      count: mockCount,
      save: mockSave,
      create: jest.fn().mockReturnValue(ringData),
    });

    const result = await RingService.create(ringData);

    expect(mockSave).toHaveBeenCalledWith(ringData);
    expect(result).toEqual(ringData);
  });

  it('deve falhar ao criar um anel se os dados forem inválidos', async () => {
    const ringData = {
      name: '',
      power: 'Fogo',
      bearer: 'Gandalf',
      forgedBy: 'Elfos',
    };

    const mockCount = jest.fn().mockResolvedValue(0);
    const mockSave = jest.fn();

    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      count: mockCount,
      save: mockSave,
      create: jest.fn(() => {
        throw new Error('Dados inválidos');
      }),
    });

    await expect(RingService.create(ringData)).rejects.toThrow('Dados inválidos');
  });
});
