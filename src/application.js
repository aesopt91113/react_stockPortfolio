import React from 'react';
import ReactDOM from 'react-dom';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // adding a new stock
    this.addStock = this.addStock.bind(this);
    this.formChange = this.formChange.bind(this);

    this.state = {
      portfolio: [
        {
          name: 'Feetbook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130
        },{
          name: 'Yamazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500
        },{
          name: 'Snoozechat',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3
        }
      ],
      // add stock
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    portfolio.splice(index, 1); // remove value at index
    this.setState({ portfolio });
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    const { name, value } = event.target;
    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  // add stock
  formChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  }

  addStock(event) {
    event.preventDefault();
    const portfolio = this.state.portfolio.slice();

    portfolio.push(this.state.form);
    // reset input
    this.setState({
      portfolio,
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    })
  }
    // Note: api JSON data often come in underscore_styled like above

  render() {
    const { portfolio, form } = this.state;
    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

    return (
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => {
                  const {
                    name,
                    shares_owned,
                    cost_per_share,
                    market_price,
                  } = stock;

                  const market_value = shares_owned * market_price;
                  const unrealized_gain_loss = market_value - shares_owned * cost_per_share;

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="cost_per_share" value={cost_per_share} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
                      <td>{market_value}</td>
                      <td>{unrealized_gain_loss}</td>
                      <td><button className="btn btn-light btn-sm" onClick={() => this.removeStock(index)}>remove</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
          <input
            className="mx-2"
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.formChange}
            value={form.name}
            required
          />
          <input
            className="mx-2"
            name="shares_owned"
            type="number"
            placeholder="Shares"
            onChange={this.formChange}
            value={form.shares_owned}
          />
          <input
            className="mx-2"
            name="cost_per_share"
            type="number"
            placeholder="Cost"
            onChange={this.formChange}
            value={form.cost_per_share}

          />
          <input
            className="mx-2"
            name="market_price"
            type="number"
            placeholder="Price"
            onChange={this.formChange}
            value={form.market_price}
          />
            <button className="btn btn-light btn-sm">Add</button>
          </form>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
