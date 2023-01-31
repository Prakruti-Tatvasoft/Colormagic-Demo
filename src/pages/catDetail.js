import { Button, Skeleton } from 'antd'
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GetCatDetail } from '../action'
import { AppContext } from '../App'

const BackButton = styled(Button)`
	width: 100px;
`

const CatDetail = () => {

	const { id } = useParams()
	const { data: cat, isLoading } = GetCatDetail(id)
	const navigate = useNavigate()
	const { setBreed } = useContext(AppContext)

	useEffect(() => {
		setBreed(cat?.data.breeds[0].id)
	}, [isLoading])

	return (
		<>
			{
				isLoading
					?
					<div className='container'>
						<div className='row'>
							<div className='col-md-2 mt-2'>
								<Skeleton.Button shape='default' block='checked' style={{ width: '100px', marginBottom: '15px' }} />
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12'>
								<Skeleton.Image active  className='cat-detail-img'/>
								<Skeleton active />
							</div>
						</div>
					</div>
					:
					<div className='container mt-2'>
						<div className='row'>
							<div className='col-md-2'>
								<BackButton type='primary' onClick={() => navigate(-1)}>
									Back
								</BackButton>
							</div>
						</div>
						<div className='row mt-2'>
							<div className='col-md-11'>
								<img src={cat?.data.url} alt='cat' className='cat-detail-img' />
								<h2>{cat?.data.breeds[0].name}</h2>
								<h5>Origin : {cat?.data.breeds[0].origin}</h5>
								<h6>{cat?.data.breeds[0].temperament}</h6>
								<p>{cat?.data.breeds[0].description}</p>
							</div>
						</div>
					</div>
			}
		</>
	)
}

export default CatDetail
