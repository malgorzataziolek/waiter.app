import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { editTableRequest } from '../../../redux/tablesRedux';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatuses } from '../../../redux/statusesReducer';
import { useNavigate } from 'react-router-dom';

const TableForm = props => {
	const navigate = useNavigate();
	const statuses = useSelector(getAllStatuses);
	const id = props.id;
	const [status, setStatus] = useState(props.status || '');
	const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
	const [maxPeopleAmount, setMaxPeopleAmount] = useState(
		props.maxPeopleAmount || ''
	);
	const [bill, setBill] = useState(props.bill || '');

	const dispatch = useDispatch();
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(
			editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id })
		);
		navigate('/');
	};

	const validStatus = status => {
		switch (status) {
			case 'busy':
				setBill(0);
				setStatus(status);
				break;
			case 'free' || 'cleaning':
				setBill(0);
				setPeopleAmount(0);
				setStatus(status);
				break;
			case 'reserved':
				setPeopleAmount(0);
				setMaxPeopleAmount(10);
				setBill(0);
				setStatus(status);
				break;
			default:
				setStatus(status);
				break;
		}
	};

	const validPeopleAmount = num => {
		if (num > maxPeopleAmount) {
			setPeopleAmount(maxPeopleAmount);
		} else if (num <= 0) {
			setPeopleAmount(0);
		} else {
			setPeopleAmount(num);
		}
	};

	const validMaxPeopleAmount = num => {
		if (peopleAmount >= num) {
			setPeopleAmount(num);
			setMaxPeopleAmount(num);
		} else if (num >= 10) {
			setMaxPeopleAmount(10);
		} else {
			setMaxPeopleAmount(num);
		}
	};

	return (
		<Form key={props.id} onSubmit={handleSubmit}>
			<Form.Group as={Row} style={{ maxWidth: '20rem' }}>
				<Form.Label column sm='3'>
					<b>Status:</b>
				</Form.Label>
				<Col sm='9' className='mb-2'>
					<Form.Select
						value={status}
						onChange={e => validStatus(e.target.value)}>
						<option>{props.status}</option>
						{statuses.map(status =>
							props.status !== status ? (
								<option key={status}>{status}</option>
							) : (
								''
							)
						)}
					</Form.Select>
				</Col>
				<Form.Label column sm='3'>
					<b>People:</b>
				</Form.Label>
				<Col sm='9' className='d-flex mb-2'>
					<Form.Control
						className='text-center'
						style={{ maxWidth: '3rem' }}
						value={peopleAmount}
						onChange={e => validPeopleAmount(e.target.value)}
					/>
					<span className='mx-1 my-auto' style={{ fontSize: '22px' }}>
						/
					</span>
					<Form.Control
						className='text-center'
						style={{ maxWidth: '3rem' }}
						value={maxPeopleAmount}
						onChange={e => validMaxPeopleAmount(e.target.value)}
					/>
				</Col>
				{status !== 'busy' && (
					<>
						<Form.Label column sm='3'>
							<b>Bill:</b>
						</Form.Label>
						<Col sm='9' className='d-flex mb-2'>
							<span className='me-1 my-auto' style={{ fontSize: '20px' }}>
								$
							</span>
							<Form.Control
								className='text-center'
								style={{ maxWidth: '4rem' }}
								value={bill}
								onChange={e => setBill(e.target.value)}
							/>
						</Col>
					</>
				)}
				<Col sm='12'>
					<Button variant='primary' type='submit'>
						Update
					</Button>
				</Col>
			</Form.Group>
		</Form>
	);
};

export default TableForm;
