/*
import React from 'react'
import { getColors } from 'react-native-image-colors'

export const usePlayerBackground = (url: string) => {
	const [colors, setColors] = React.useState(null)

		getColors(url, {
			fallback: '#228B22',
			cache: true,
			key: url,
		}).then((result : any) => {
			setColors(result)
		})

	return colors
}
*/