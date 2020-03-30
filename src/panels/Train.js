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

const osName = platform();

const Train = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
		<PanelHeader>Тренировка</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
        <h2 align = "center"> Выберите предмет</h2>
		<Group title="Subjects">
			<Div>
                <Button size="xl" level="3" onClick={go} data-to="math">
				    Математика    
                </Button>
                <Button size="xl" level="3" onClick={go} data-to="persik">
				    Русский язык    
                </Button>
                <Button size="xl" level="3" onClick={go} data-to="persik">
				    Английский язык 
                </Button>
                <Button size="xl" level="3" onClick={go} data-to="persik">
				    Информатика
                </Button>
                <Button size="xl" level="1" onClick={go} data-to="home">
				    Вернуться назад.
                </Button>
            </Div>
		</Group>
	</Panel>
);

Train.propTypes = {
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

export default Train;

