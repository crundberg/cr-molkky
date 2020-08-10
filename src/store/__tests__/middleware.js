import { asyncer, logger } from '../middlewares';

it('should handle logger in not development', () => {
	logger({}, {}, {});
});

it('should handle logger in development', () => {
	const env = process.env.NODE_ENV;
	process.env.NODE_ENV = 'development';

	logger({}, {}, {});

	process.env.NODE_ENV = env;
});
