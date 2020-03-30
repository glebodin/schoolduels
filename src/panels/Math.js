import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import axios from 'axios';

const osName = platform();

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let subject = "math"
let min = 0, max = 2;
let num = randomInteger(min, max);
let URL = "https://api.duels.asimple.ru/tasks/" + subject + "/" + num;

class CheckAns extends React.Component {
    constructor () {
        super()
        this.state = {
            fields: {},
            errors: {}, 
            data: "fail"
        }
    }
    
    componentDidMount () {
        let fields = this.state.fields;
        axios.post("https://api.duels.asimple.ru/check_answer", {"answer": "", "subject": subject, "task_id": num}).then(res => {
            console.log(res);
            this.setState({data: res})
        })
    }

    handleValidation() {
        let fields = this.state.fields;
        axios.post("https://api.duels.asimple.ru/check_answer", {"answer": fields["ans"], "subject": subject, "task_id": num}).then(res => {
            console.log(res);
            this.setState({data: res})
        })
    }

    
    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    
    contactSubmit(e){
        e.preventDefault();
        this.handleValidation();
        console.log(this.data);
        if(this.data = "correc"){
           alert("Да, правильно.");
        }
        else{
           alert("Нет, не верно.")
        }
    }
    
    render() {
        return (
            <div>
                <form name="info" method="post" onSubmit= {this.contactSubmit.bind(this)}>
                    <fieldset>
                        <p><b>Введите ответ:</b><br/> <input refs="ans" type="text" size="40" name="ans" onChange={this.handleChange.bind(this, "ans")} value={this.state.fields["ans"]}/>
                        </p>
                        <p><input type="submit" value="Отправить"/>
                        <input type="reset" value="Очистить" /></p>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const True = () => (
    <div>
        <p> Да, это правильный ответ </p>
    </div>
);

const False = () => (
    <div>
        <p> Нет, это неправильный ответ </p>
    </div>
);

class GetTask extends React.Component {
    constructor () {
        super()
        this.state = {}
    }
    componentDidMount () {
        axios.get(URL).then(res => {
            this.setState({task: res.data.task})
        })
    }

    render() {
        return (
            <div>
                <p align = "center"> {this.state.task} </p>
            </div>
        );
    }
};

/*const CheckAns = () => {
    return (
        <div>
            <form name="info" method="post" onSubmit= {this.contactSubmit.bind(this)}>
                <p><b>Введите ответ:</b><br/> <input type="text" size="40" name="ans"/>
                </p>
                <p><input type="submit" value="Отправить"/>
                <input type="reset" value="Очистить" /></p>
            </form>
        </div>
    );
};*/

const MathTask = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
        <PanelHeader>Тренировка по математике</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
        <Div>
		    <GetTask />
            <CheckAns />
            <Button size="xl" level="2" onClick={go} data-to="train">
			    Выбрать другой предмет.
            </Button>
            <Button size="xl" level="1" onClick={go} data-to="home">
		        Главное меню.
            </Button>
        </Div>
    </Panel>
);

MathTask.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default MathTask;
