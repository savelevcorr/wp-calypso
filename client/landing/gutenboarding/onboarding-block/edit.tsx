/**
 * External dependencies
 */
import { __ as NO__ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import React, { forwardRef } from 'react';
import { Button } from '@wordpress/components';
import { Link } from 'react-router-dom';

/**
 * Internal dependencies
 */
import { isFilledFormValue } from '../stores/onboard/types';
import { STORE_KEY } from '../stores/onboard';
import StepperWizard from './stepper-wizard';
import VerticalSelect from './vertical-select';
import SiteTitle from './site-title';
import './style.scss';

interface LinkButtonProps extends Button.AnchorProps {
	navigate: () => {};
}
// Render `Link` with `@wordpress/components` `Button`
// Needs to handle `navigate` onClick
// from https://github.com/ReactTraining/react-router/blob/e81dfa2d01937969ee3f9b1f33c9ddd319f9e091/packages/react-router-dom/modules/Link.js#L21
const LinkButton = forwardRef< HTMLAnchorElement, LinkButtonProps >(
	( { navigate, onClick, ...rest }, forwardedRef ) => {
		const { target } = rest;
		const props = {
			...rest,
			onClick: ( event: React.MouseEvent< HTMLAnchorElement, MouseEvent > ) => {
				try {
					if ( onClick ) onClick( event );
				} catch ( ex ) {
					event.preventDefault();
					throw ex;
				}

				if (
					! event.defaultPrevented && // onClick prevented default
					event.button === 0 && // ignore everything but left clicks
					( ! target || target === '_self' ) && // let browser handle "target=_blank" etc.
					! isModifiedEvent( event ) // ignore clicks with modifier keys
				) {
					event.preventDefault();
					navigate();
				}
			},
		};
		return <Button ref={ forwardedRef } { ...props } />;
	}
);
function isModifiedEvent( event ) {
	return !! ( event.metaKey || event.altKey || event.ctrlKey || event.shiftKey );
}

export default function OnboardingEdit() {
	const { siteVertical, siteTitle } = useSelect( select => select( STORE_KEY ).getState() );

	return (
		<div className="onboarding-block__acquire-intent">
			<div className="onboarding-block__questions">
				<h2 className="onboarding-block__questions-heading">
					{ ! isFilledFormValue( siteVertical ) &&
						! siteTitle.length &&
						NO__( "Let's set up your website – it takes only a moment." ) }
				</h2>
				<StepperWizard>
					<VerticalSelect />
					{ ( isFilledFormValue( siteVertical ) || siteTitle.length ) && <SiteTitle /> }
				</StepperWizard>
				{ isFilledFormValue( siteVertical ) && (
					<div className="onboarding-block__footer">
						<Link
							component={ LinkButton }
							to="/fse"
							isLink
							className="onboarding-block__question-skip"
						>
							{ NO__( "Don't know yet" ) } →
						</Link>
					</div>
				) }
			</div>
		</div>
	);
}
