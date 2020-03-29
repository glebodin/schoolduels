import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './Train.css';

const osName = platform();
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
let topic = "math", diff = "1", nownum = 0, res = fetch('http://asimple.ru:5001/tasks/math/1/0');
let ans = JSON.parse(res);
let task = "" + ans.task;

const Task = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={props.go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			Задача
		</PanelHeader>
		<div>
            <h2>"http://asimple.ru:5001/tasks/math/1/0"</h2>
            <h2>{task}</h2>
            <True />
        </div>
	</Panel>
);

Task.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Task;
