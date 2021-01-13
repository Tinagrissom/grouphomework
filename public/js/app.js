class App extends React.Component {

  state = {
    name: '',
    image: '',
    date: '',
    location: '',
    birds: [],
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/birds', this.state).then((response) => {
      console.log(response.data);
      this.setState({ birds: response.data, name: '', image: '', date: '', location: '' })
    })
  }

  deleteBird = (event) => {
    axios.delete('/birds/' + event.target.value).then((response) => {
      this.setState({
        birds: response.data,
      })
    })
  }

  updateBird = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/birds/' + id, this.state).then((response) => {
      this.setState({
        birds: response.data,
        name: '',
        image: '',
        date: '',
        location: '',
      })
    })
  }

  componentDidMount = () => {
    axios.get('/birds').then((response) => {
      this.setState({
        birds: response.data,
      })
    })
  }

  render = () => {
    return (
      <div>
          <h1>Bird Sightings</h1>
                <form className="addForm" onSubmit={this.handleSubmit}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange}/>
                  <br />
                  <label htmlFor="image">Image</label>
                  <input type="text" id="image" onChange={this.handleChange}/>
                  <br />
                  <label htmlFor="date">Date</label>
                  <input type="text" id="date" onChange={this.handleChange}/>
                  <br />
                  <label htmlFor="location">Location</label>
                  <input type="text" id="location" onChange={this.handleChange}/>
                  <br />
                  <input type="submit" value="Add Sighting"/>
                </form>
            <h1>Recent Sightings</h1>
              <ul>
                <div className="row">
                {this.state.birds.map((bird) => {
                  return (
                    <div className="card">
                    <li key={bird._id}>
                    {bird.name}
                    <img src={bird.image} alt={bird.name} />
                    <button value={bird._id} onClick={this.deleteBird}>DELETE</button>
                      <details>
                        <summary>Edit this Sighting</summary>
                        <form id={bird._id} onSubmit={this.updateBird}>
                          <label htmlFor="name">Name</label>
                          <input type="text" id="name" onChange={this.handleChange} />
                          <br />
                          <label htmlFor="image">Image</label>
                          <input type="text" id="image" onChange={this.handleChange} />
                          <br />
                          <label htmlFor="date">Date</label>
                          <input type="text" id="date" onChange={this.handleChange} />
                          <br />
                          <label htmlFor="location">Location</label>
                          <input type="text" id="location" onChange={this.handleChange} />
                          <br />
                          <input type="submit" value="Update"/>
                        </form>
                      </details>
                    </li>
                  </div>
                  )
                })}
              </div>
            </ul>
      </div>
    )
  }
}

ReactDOM.render(<App></App>, document.querySelector('main'))
