import React, {Component} from 'react';
import {DataGrid} from './components/DataGrid.js';
import {UserDetails} from './components/UserDetails.js';
import {ChangeData} from "./components/ChangeData";
import data1 from './data/packageSmall';
import data2 from './data/packageBig';


class App extends Component {
    constructor(props) {
        super(props);
        const users = data1;
        const columns = [
            {key: 'id', label: 'Id', formatter: row => row.id},
            {key: 'firstName', label: 'First name', formatter: row => row.firstName},
            {key: 'lastName', label: 'Last name', formatter: row => row.lastName},
            {key: 'email', label: 'E-mail', formatter: row => row.email},
            {key: 'phone', label: 'Phone', formatter: row => row.phone},
            {
                key: 'address',
                label: 'Address',
                formatter: row => row.address.state + ', ' +
                    row.address.city + ', ' +
                    row.address.streetAddress + ', ' +
                    row.address.zip
            },
            {key: 'description', label: 'Description', formatter: row => row.description},
        ];

        this.state = {
            activeUser: null,
            users: users,
            columns: columns,
        };
    }


    loadData(data) {
        //Загружаем данные по ссылке
        if(!data){
            //Если ссылку не передали, берем ссылку из свойств
            data=this.state.users;
        }
        //Включаем индикатор загрузки
        document.querySelector("body").setAttribute('class','load');

            this.setState({
                users: data,
            });
            // Выкоючаем индикатор загрузки
            document.querySelector("body").setAttribute('class','');

        // });
    }

    _onSearchFieldInput(e) {
        //Устанавливаем искомую строку
        this.setState({
            searchString: e.currentTarget.value
        });
    }

    _onActiveUserChanged(newUser){
        //Устанавливаем выбранную строку
        this.setState({
            activeUser: newUser,
        });
    }

    _onDataChange(){
        //Выбираем другой набор данных и подгружаем его
        if (this.state.users===data1){
            this.setState({
                users: data2,
            });
            this.loadData(data2);

        }else{
            this.setState({
                users: data1,
            });
            this.loadData(data1);

        }
    }

    render() {
        const userDetails = this.state.activeUser ?
            <UserDetails user={this.state.activeUser}/> :
            'Выберите пользователя';
        return (
            <div className="App">
                <p>Гукетлева Дарья. Таблица на React</p>
                <label>
                    Поиск
                    <input type="text" name='Поиск' onInput={e => this._onSearchFieldInput(e)}/>
                </label>
                <ChangeData onDataChange={e=> this._onDataChange(e)}></ChangeData>
                <DataGrid data={this.state.users}
                          searchString={this.state.searchString}
                          columns={this.state.columns}
                          onActiveRowChanged={user=>this._onActiveUserChanged(user)}/>
                {userDetails}
            </div>
        );
    }
}

export default App;
