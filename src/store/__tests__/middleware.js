import { asyncer, logger } from '../middlewares';

it('should handle asyncer with a action function', () => {
	const fn = () => {};
	asyncer(fn, {});
});

it.skip('should handle asyncer with a action object', () => {});

it('should handle logger in not development', () => {
	logger({}, {}, {});
});

it('should handle logger in development', () => {
	const env = process.env.NODE_ENV;
	process.env.NODE_ENV = 'development';

	logger({}, {}, {});

	process.env.NODE_ENV = env;
});
