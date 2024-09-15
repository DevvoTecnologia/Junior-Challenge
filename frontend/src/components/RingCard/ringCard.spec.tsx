import { queryClient } from '@/lib/react-query.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RingCard } from './index.tsx';

const ring = {
  ring_name: "anel teste",
  ring_image: "imagem do anel",
  ring_power: "poder do anel",
  carrier: {
    carrier_id: 1,
    carrier_name: " Bilbo",
    created_at: "2024-09-12T17:39:02.738Z",
    updated_at: "2024-09-12T17:39:02.738Z",
    deleted_at: null
  },
  forger: {
    forger_id: 1,
    forger_name: "Anões",
    forger_max_forge: 7,
    created_at: "2024-09-12T17:38:52.620Z",
    updated_at: "2024-09-12T17:38:52.620Z",
    deleted_at: null
  },
  ring_id: 1,
  created_at: "2024-09-14T18:39:10.615Z",
  updated_at: "2024-09-14T18:39:10.615Z",
  deleted_at: null
}

describe('Ring Card', () => {
  it('should show ring card', () => {
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <RingCard ring={ring} />
        </MemoryRouter>
      </QueryClientProvider>
    )
    
    const ringName = wrapper.getByTestId("ringName");
    const ringPower = wrapper.getByTestId('ringPower');
    const ringForger = wrapper.getByTestId('ringForger');
    const ringCarrier = wrapper.getByTestId('ringCarrier');

    expect(ringName).toBeInTheDocument();
    expect(ringPower).toBeInTheDocument();
    expect(ringForger).toBeInTheDocument();
    expect(ringCarrier).toBeInTheDocument();
  })

  it('should show delete dialog', async () => {
    const user = userEvent.setup();

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <RingCard ring={ring} />
        </MemoryRouter>
      </QueryClientProvider>
    )

    const trashButton = wrapper.getByTestId('trashButton')
    await user.click(trashButton);
    const statusText = wrapper.getByText("Você tem certeza que deseja deletar este anel?");

    expect(statusText).toBeInTheDocument();
  })
})

