import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ROUTE } from '../constants/is-public-route.constant';

export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true);
