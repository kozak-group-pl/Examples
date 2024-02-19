import { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { Divider, Typography } from '@mui/material';
import { getUsers } from 'entities/admin/Users/api';
import { GetFilesReq } from 'entities/admin/Users/api/types';
import { ColorPalette } from 'shared/consts/colorPalette';
import { UsersTable, UsersFilter } from 'widgets/admin/Users';

export const Users: FunctionComponent = () => {
	const [filters, setFilters] = useState<GetFilesReq>({
		sort: 'asc',
	});

	const { data: UsersData } = useQuery({
		queryKey: ['admin/users', filters],
		queryFn: () => getUsers({ ...filters }),
	});

	return (
		<>
			<Typography variant={'h4'} color={ColorPalette.astronaut}>
				Users
			</Typography>
			<Typography variant={'subtitle1'} color={ColorPalette.baliHai} sx={{ marginTop: '24px' }}>
				Invite your team-members into your account
			</Typography>

			<Divider color={ColorPalette.periwinkle} sx={{ margin: '42px 0 44px 0' }} />
			<UsersFilter filters={filters} setFilters={setFilters} />

			<UsersTable users={UsersData?.data?.results || []} />
		</>
	);
};
