import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import UserProfile from '../components/userpregame/UserProfile';
import { WhiteBox } from '../utils/Semantics';
import useApi from '../hooks/useApi';
import UserTreasureList from '../components/userendgame/UserTreasureList';

interface TreasureInfo {
	id: number;
	imgPath: string;
	lat: string;
	lng: string;
	hint: string;
	rewardImgPath: string;
	reward: string;
	status: boolean;
	finderNick: string | null;
}

interface User {
	id: string;
	roomId: number;
	nickname: string;
	profileImage: string;
}

function UserEndPage(): JSX.Element {
	// 유저 정보
	const userState = useSelector((state: RootState) => state.user);
	const treasureListApi = useApi();
	const [treasures, setTreasures] = useState<TreasureInfo[]>([]);
	// 	console.log(userState);
	//   character : 4
	// gamePlayTime : 15
	// gameStartTime : "2023-05-01T08:14:27"
	// nickname : "아이돌한원석"
	// roomCode : "ekotQrpTA"
	// roomId : 1
	// treasureNumber : 2
	// userId : "1_2923349138"

	const user: User = {
		id: userState.userId,
		roomId: userState.roomId,
		nickname: userState.nickname,
		profileImage: String(userState.character),
	};

	// const treasureList: TreasureInfo[] = [
	// 	{
	// 		id: 1,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 2,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 3,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 4,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 5,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 6,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 7,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 8,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// 	{
	// 		id: 9,
	// 		imgPath: require('../assets/images/bottle.png'),
	// 		lat: 'funckyou',
	// 		lng: 'and your mom',
	// 		hint: 'and your sister',
	// 		rewardImgPath: require('../assets/images/kakao_login.png'),
	// 		reward: 'and your job',
	// 		status: true,
	// 		finderNick: 'and your broken ass car',
	// 	},
	// ];

	useEffect(() => {
		treasureListApi.fetchGetApi(
			`/treasures/user?room=${userState.roomId}&user=13_230985`
			// `/treasures/user?room=${userState.roomId}&user=${userState.userId}`
		);
	}, []);

	useEffect(() => {
		if (treasureListApi.data?.success) {
			setTreasures(treasureListApi.data.data);
		}
	}, [treasureListApi.data]);

	return (
		<div className='flex flex-col w-full h-full space-y-10 bg-white2'>
			<UserProfile user={user} />
			<div className='flex flex-col items-center justify-center'>
				<WhiteBox className='h-auto shadow-lg'>
					<UserTreasureList treasureList={treasures} />
				</WhiteBox>
				<WhiteBox className='h-auto shadow-lg'>{/* 보물지도 */}</WhiteBox>
			</div>
		</div>
	);
}

export default UserEndPage;
