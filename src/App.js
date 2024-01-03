import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colourList = ['red', 'orange', 'yellow', 'green']

class App extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    latestList: [],
    isTrue: false,
    isShow: false,
  }

  onAddWebsite = e => {
    this.setState({website: e.target.value})
  }

  onAddUserName = e => {
    this.setState({userName: e.target.value})
  }

  onAddPassword = e => {
    this.setState({password: e.target.value})
  }

  onAddItem = e => {
    e.preventDefault()
    const {website, userName, password} = this.state
    const initialLetter = website.slice(0, 1).toUpperCase()
    const newValues = {
      id: v4(),
      initial: initialLetter,
      websiteName: website,
      username: userName,
      Password: password,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      userName: '',
      password: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  searchItems = e => {
    this.setState({searchInput: e.target.value})
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {latestList} = this.state
    const updatedList = latestList.filter(each => each.id !== id)
    this.setState({latestList: updatedList})
  }

  render() {
    const {
      latestList,
      searchInput,
      isShow,
      website,
      userName,
      password,
    } = this.state
    let {isTrue} = this.state
    const filteredList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    const randomColour = colourList[Math.floor(Math.random() * 4)]
    return (
      <div className="bg-con">
        <img
          className="img1"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />

        <div className="card1">
          <form onSubmit={this.onAddItem} className="form">
            <h1 className="h1">Add New Password</h1>
            <div className="adjust">
              <img
                className="img-sm"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onAddWebsite}
                value={website}
                className="input"
              />
            </div>
            <div className="adjust">
              <img
                className="img-sm"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onAddUserName}
                value={userName}
                className="input"
              />
            </div>
            <div className="adjust">
              <img
                className="img-sm"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onAddPassword}
                value={password}
                className="input"
              />
            </div>

            <button type="submit" className="btn">
              Add
            </button>
          </form>

          <img
            className="img2"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
          />
        </div>
        <br />
        <div className="card2">
          <div className="adj-col">
            <h1>Your Passwords</h1>
            <p>{filteredList.length}</p>
            <div className="adjust">
              <img
                className="img-sm"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="input"
                type="search"
                placeholder="Search"
                onChange={this.searchItems}
              />
            </div>
          </div>

          <hr />
          <div className="right-adj">
            <input type="checkbox" id="check" onClick={this.showPassword} />
            <label htmlFor="check">Show Passwords</label>
          </div>

          {!isTrue && (
            <div>
              <img
                className="img2"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul>
              {filteredList.map(eachObject => (
                <li
                  key={eachObject.id}
                  id={eachObject.id}
                  className="list-item"
                >
                  <div className="list-items">
                    <p className={randomColour}>{eachObject.initial}</p>
                    <div>
                      <p>{eachObject.websiteName}</p>
                      <p>{eachObject.username}</p>
                      {!isShow && (
                        <img
                          className="starImage"
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                      {isShow && <p>{eachObject.Password}</p>}
                    </div>

                    <button
                      data-testid="delete"
                      className="btn1"
                      type="button"
                      onClick={() => this.deleteItem(eachObject.id)}
                    >
                      <img
                        className="img-del"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
