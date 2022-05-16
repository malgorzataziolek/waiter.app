import TableForm from '../features/TableForm/TableForm';
import { useSelector } from 'react-redux';
import { getTableById } from '../../redux/tablesRedux';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const SingleTable = () => {
	const { id } = useParams();
	const tableData = useSelector(state => getTableById(state, parseInt(id)));
	if (!tableData)
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
		<>
			<h1 className='mb-4'>Table {tableData.id}</h1>
			<TableForm {...tableData} />
		</>
	);
};

export default SingleTable;
