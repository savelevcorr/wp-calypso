/**
 * Internal dependencies
 */
import { findThemeFilterTerm } from 'state/themes/selectors/find-theme-filter-term';

import 'state/themes/init';

/**
 * Whether a filter term slug is valid
 *
 * @param  {object}  state Global state tree
 * @param  {string}  term  The term to validate
 * @returns {boolean}          True if term is valid
 */
export function isValidThemeFilterTerm( state, term ) {
	return !! findThemeFilterTerm( state, term );
}
