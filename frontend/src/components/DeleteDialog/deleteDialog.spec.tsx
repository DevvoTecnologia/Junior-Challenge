import { queryClient } from '@/lib/react-query.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteDialog } from './index.tsx';

describe('Delete Dialog', () => {
  it('should show delete dialog', async () => {
    const user = userEvent.setup();

    const wrapper = render(<DeleteDialog />, {
      wrapper: ({children}) => {
        return(
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        )
      } 
    })

    const trashButton = wrapper.getByTestId('trashButton')
    await user.click(trashButton);
    const statusText = wrapper.getByText("Você tem certeza que deseja deletar este anel?");

    expect(statusText).toBeInTheDocument();
  })
})