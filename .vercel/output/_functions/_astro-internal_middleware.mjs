import { d as defineMiddleware, s as sequence } from './chunks/index_CiPoFpH6.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DTAjIt-M.mjs';
import 'piccolore';
import './chunks/astro/server_9vvDxKFD.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
