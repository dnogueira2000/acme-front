import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';

export default class Lista extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      lista: [],
      listaNome: '',
      item1: '',
      item2: '',
      item3: ''
    }
    
    this.url = 'http://localhost:8080/listas';
  }
  
  componentDidMount() {
    axios.get(this.url)
      .then(res => {
        const lista = res.data.content;
        this.setState({ lista });
      })
  }

  atualizar() {
    window.location.reload(false);
  }

  marcarConcluido(id) {
    axios.put(this.url + '/' + id, {concluido: true} )
    .then(res => {
      this.atualizar();
    })
  }

  excluir(id) {
    axios.delete(this.url + '/' + id )
    .then(res => {
      this.atualizar();
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const objeto = {
      listaNome: this.state.listaNome,
      tarefas: [
        {
          "dataCadastro": "28/12/2020",
          "dataAtualizacao": "28/12/2020",
          "concluido": false,
          "dataTarefa": "10/01/2021",
          "tarefa": this.state.item1
        },
        {
          "dataCadastro": "28/12/2020",
          "dataAtualizacao": "28/12/2020",
          "concluido": false,
          "dataTarefa": "10/01/2021",
          "tarefa": this.state.item2
        },
        {
          "dataCadastro": "28/12/2020",
          "dataAtualizacao": "28/12/2020",
          "concluido": false,
          "dataTarefa": "10/01/2021",
          "tarefa": this.state.item3
        }
      ]
    };

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    axios.post(this.url, objeto, axiosConfig)
      .then(res => {
        this.atualizar();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
  }

  render() {
    return (
      <div className="container">
        <h2>Criar Lista</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Lista: </label><br/>
            <input className="form-control" type="text" name="listaNome" value={this.state.listaNome} 
              onChange={this.handleChange}/>
          </div>
          
          <div className="form-group">
           <label>Item 1: </label><br/>
           <input className="form-control" type="text" name="item1" value={this.state.item1} 
            onChange={this.handleChange}/>
          </div>
         
          <div className="form-group">
            <label>Item 2: </label><br/>
            <input className="form-control" type="text" name="item2" value={this.state.item2} 
              onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label>Item 3: </label><br/>
            <input className="form-control" type="text" name="item3" value={this.state.item3} 
              onChange={this.handleChange}/>
          </div>
          
          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>

        { this.state.lista.map(item => 
          <ul>
            <li><h3>{item.listaNome}</h3></li>
            { item.tarefas.map(t =>  
              <ul>
                <li>
                  <p> {t.tarefa} </p>
                  <button type="button" className={t.concluido !== true ? "btn btn-secondary" : "btn btn-success"} onClick={(e) => this.marcarConcluido(t.id)}>
                    {t.concluido !== true ? "Não concluído" : "Concluído"}
                  </button>
                  <button type="button" className="btn btn-danger" onClick={(e) => this.excluir(t.id)}>
                    Excluir
                  </button><br/>
                </li>
              </ul>) } 
          </ul>
        )}
      </div>
      
    )
  }
}