import React from 'react'
import Head from 'next/head'


const HeadComponent = ({ title }) => {
	return (
		<Head>
			<title>Infilate | {title}</title>
		</Head>
	)
}

export default HeadComponent