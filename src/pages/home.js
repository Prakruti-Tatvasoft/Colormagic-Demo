import { Button, Card, Select, Skeleton } from 'antd'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GetBreeds, GetCatList } from '../action'
import { AppContext } from '../App'

const Title = styled.h2`
	margin: 10px 0px 10px 0px;
`

const SubTitle = styled.span`
	font-size: 20px;
`

const SelectBreed = styled(Select)`
	width: 200px;
`

const Home = () => {
	const [breedId, setBreedId] = useState()
	const { breed: selectedBreed } = useContext(AppContext)
	const navigate = useNavigate()

	// get breeds
	const { data: breeds, isLoading } = GetBreeds()

	const handleChange = (value) => {
		setBreedId(value)
	}

	// set breedId if click back from view details
	useEffect(() => {
		setBreedId(selectedBreed)
	}, [selectedBreed])

	const options = breeds?.data.map((breed) => {
		return {
			label: breed.name,
			value: breed.id
		}
	})

	// get cats
	const { data: cats, fetchNextPage, hasNextPage, isFetchNextPage } = GetCatList(breedId)
	return (
		<>
			{
				isLoading
					?
					// <h1>Loading....</h1>
					<div className='container'>
						<div className='row'>
							<div className='col-md-4 mb-3 mt-3'>
								<Skeleton paragraph={{rows:1}} />
								<Skeleton.Button shape='default' block='checked' />
								<Skeleton.Button shape='default' block='checked' style={{marginTop: '10px'}}/>
							</div>
						</div>
					</div>
					:
					<div className='container'>
						<div className='row'>
							<div className='col-md-4 mb-3'>
								<Title>Cat Browser</Title>
								<SubTitle>Breed</SubTitle>
								<br />
								<SelectBreed
									size='large'
									defaultValue="select breed"
									onChange={handleChange}
									options={options}
									value={breedId}
								></SelectBreed>
							</div>
						</div>
						<div className='row'>
							{
								cats?.pages.map((page, index) => {
									return (
										<Fragment key={index}>
											{
												page?.data.map(cat => {
													return (
														<div className='col-md-3 col-sm-4 col-xs-6' key={cat.id}>
															<Card
																cover={
																	<img
																		className='card-img'
																		alt="cat"
																		src={cat.url}
																	/>
																}>
																<Button type='primary' block onClick={() => navigate(`/${cat.id}`)} style={{ height: '35px', fontSize: 16 }}>
																	View Details
																</Button>
															</Card>
														</div>
													)
												})
											}
										</Fragment>
									)
								})
							}
						</div>
						<Button onClick={fetchNextPage} type='primary' disabled={!hasNextPage || isFetchNextPage}>Load More</Button>
					</div>
			}
		</>
	)
}

export default Home
