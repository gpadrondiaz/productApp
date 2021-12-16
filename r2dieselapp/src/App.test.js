import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';


describe('<App />', () => {
  it('render table', async () => {
    render(<App />);

    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Need to repair')).toBeInTheDocument();
    expect(screen.getByText('Durability')).toBeInTheDocument();
    expect(screen.getByText('Mileage')).toBeInTheDocument();

    const productRows = screen.getAllByTestId(
      'product-row-test-id',
      {
        exact: false,
      }
    );

    expect(productRows.length).toBe(17);
  });

  it('seach product table', async () => {
    render(<App />);

    expect(screen.getByText('Air Compressor 12 GAS')).toBeInTheDocument();
    expect(screen.getByText('Dia Blade 14 inch')).toBeInTheDocument();

    const search = screen.getByPlaceholderText('Search');

    userEvent.type(search, 'Air Compressor 12 GAS');
    expect(screen.getByText('Air Compressor 12 GAS')).toBeInTheDocument();
    expect(screen.queryByText('Dia Blade 14 inch')).not.toBeInTheDocument();
    const productRows = screen.getAllByTestId(
      'product-row-test-id',
      {
        exact: false,
      }
    );

    expect(productRows.length).toBe(1);
  });

  it('order by code', async () => {
    render(<App />);

    const productRows = screen.getAllByTestId(
      'product-row-test-id',
      {
        exact: false,
      }
    );
    expect(productRows[0]).toHaveTextContent("p1"); 
    const codeColumn = screen.getByText('Code');

    userEvent.click(codeColumn);
    expect(productRows[0]).toHaveTextContent("m1"); 

  });

  it('open and close Book modal', async () => {
    render(<App />);
    const book = screen.getByText('Book');
    userEvent.click(book);
    expect(screen.getByText('Book a product')).toBeInTheDocument();

    const no = screen.getByText('No');
    userEvent.click(no);
    expect(screen.queryByText('Book a product')).not.toBeInTheDocument();
  });

  it('open and close Return modal', async () => {
    render(<App />);
    const returnModal = screen.getByText('Return');
    userEvent.click(returnModal);
    expect(screen.getByText('Return a product')).toBeInTheDocument();

    const no = screen.getByText('No');
    userEvent.click(no);
    expect(screen.queryByText('Return a product')).not.toBeInTheDocument();
  });
});