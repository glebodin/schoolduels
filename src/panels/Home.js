import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './Home.css';
let rating = 0, place = 1;

const Scoreboard = () => {
    return (
        <div>
            <h1 align="center"><strong> {rating} </strong></h1>
            <h3 align="center"> ({place} место в общем рейтинге)</h3>
            <h2 align="center"> Ваш рейтинг </h2>
        </div>
    );
};

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Главная</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}

		<Group title="Navigation Example">
			<Div>
                <Scoreboard />
                <Button size="xl" level="2" onClick={go} data-to="train">
				    Порешать задачи для тренировки	
                </Button>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Начать дуэль с случайным человеком.
				</Button>
                <Button size="xl" level="2" onClick={go} data-to="persik">
					Начать дуэль с другом.
				</Button>
                <Button size="xl" level="2" onClick={go} data-to="persik">
					Таблица очков в дуэлях.
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
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

export default Home;
