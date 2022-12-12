import { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			main: '#037971',
			light: '#F5FFFF',
		},
		secondary: {
			main: '#5FC3DB',
			light: '#EFF1F2',
			dark: '#F7F8F9',
		},
		lightError: {
			main: '#FFD7D9',
			light: '#FDF7F8',
			dark: '#D13057',
			contrastText: '#A2191F',
		},
		error: {
			light: '#FFD7D9',
			main: '#D13057',
		},
		lightWarning: {
			main: '#FFF2DA',
			contrastText: '#FFAF22',
		},
		lightSuccess: {
			main: '#E0F8F1',
			contrastText: '#30D1A1',
		},
		...(mode === 'light'
			? {
					background: {
						default: '#F7F8F9',
					},
					text: {
						primary: 'rgba(0,0,0,1)',
						secondary: 'rgba(0,0,0,0.7)',
					},
			  }
			: {
					background: {
						paper: '#161616',
					},
					action: {
						hoverOpacity: 0.16,
						selectedOpacity: 0.34,
					},
			  }),
	},
});
