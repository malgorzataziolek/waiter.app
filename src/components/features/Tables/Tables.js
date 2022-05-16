import { ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Tables = () => {
	const tables = useSelector(getAllTables);
	if (tables.length === 0)
		return (
			<div className='d-flex justify-content-center' style={{ padding: '10%' }}>
				<Spinner
					style={{ width: '5rem', height: '5rem', fontSize: '2rem' }}
					animation='border'
					variant='primary'
				/>
			</div>
		);
	return (
		<ListGroup variant='flush'>
			{tables.map(table => (
				<ListGroup.Item
					key={table.id}
					className='py-3 mb-4 d-flex justify-content-between align-items-start'>
					<div className='d-flex align-items-center'>
						<h2 className='my-0'>Table {table.id}</h2>
						<span className='vr mx-1'></span>
						<b>Status: </b>
						<span className='ms-1 text-muted'>{table.status}</span>
					</div>
					<Button as={Link} to={`/table/${table.id}`} variant='primary'>
						Show more
					</Button>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default Tables;
