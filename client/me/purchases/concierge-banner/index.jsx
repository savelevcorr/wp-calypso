/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import Card from 'components/card';
import ActionCard from 'components/action-card';
import TrackComponentView from 'lib/analytics/track-component-view';
import conciergeImage from 'assets/images/illustrations/jetpack-concierge.svg';
import {
	CONCIERGE_HAS_UPCOMING_APPOINTMENT,
	CONCIERGE_HAS_AVAILABLE_INCLUDED_SESSION,
	CONCIERGE_HAS_AVAILABLE_PURCHASED_SESSION,
	CONCIERGE_SUGGEST_PURCHASE_CONCIERGE,
} from 'me/constants';

/**
 * Style dependencies
 */
import './style.scss';

class ConciergeBanner extends Component {
	placeholder() {
		return (
			<Card compact={ false }>
				<div className="concierge-banner__placeholders is-placeholder">
					<div className="concierge-banner__placeholder-row-container is-placeholder">
						<div className="concierge-banner__placeholder-row is-placeholder" />
						<div className="concierge-banner__placeholder-row is-placeholder" />
						<div className="concierge-banner__placeholder-row is-placeholder" />
					</div>
					<div className="concierge-banner__placeholder-button-container">
						<div className="concierge-banner__placeholder-button is-placeholder" />
					</div>
				</div>
			</Card>
		);
	}

	getBannerContent() {
		const { bannerType, translate } = this.props;

		let headerText, mainText, buttonText, buttonHref, illustrationUrl;

		switch ( bannerType ) {
			case CONCIERGE_HAS_UPCOMING_APPOINTMENT:
				headerText = translate( 'Your appointment is coming up!' );
				mainText = translate(
					'Get ready with your questions for your upcoming Quick Start session appointment.',
					{
						comment:
							"Please extend the translation so that it's clear that these sessions are only available in English.",
					}
				);
				buttonText = translate( 'Session dashboard' );
				buttonHref = '/me/concierge';
				illustrationUrl = conciergeImage;
				break;

			case CONCIERGE_HAS_AVAILABLE_INCLUDED_SESSION:
				headerText = translate( 'Looking for Expert Help?' );
				mainText = translate(
					'Get 30 minutes dedicated to the success of your site. Schedule your free 1-1 Quick Start Session with a Happiness Engineer!',
					{
						comment:
							"Please extend the translation so that it's clear that these sessions are only available in English.",
					}
				);
				buttonText = translate( 'Schedule Now' );
				buttonHref = '/me/concierge';
				illustrationUrl = conciergeImage;
				break;

			case CONCIERGE_HAS_AVAILABLE_PURCHASED_SESSION:
				headerText = translate( 'Our experts are waiting to help you' );
				mainText = translate(
					'Schedule your 45-minute 1-1 Quick Start Session with a Happiness Engineer!',
					{
						comment:
							"Please extend the translation so that it's clear that these sessions are only available in English.",
					}
				);
				buttonText = translate( 'Schedule Now' );
				buttonHref = '/me/concierge';
				illustrationUrl = conciergeImage;
				break;

			case CONCIERGE_SUGGEST_PURCHASE_CONCIERGE:
				headerText = translate( 'Need an expert by your side?' );
				mainText = translate(
					'We offer one-on-one Quick Start sessions dedicated to your site’s success. Click the button to learn how we can help you during these 45 minute calls.',
					{
						comment:
							"Please extend the translation so that it's clear that these sessions are only available in English.",
					}
				);
				buttonText = translate( 'Learn More' );
				buttonHref = '/checkout/offer-quickstart-session';
				illustrationUrl = '/calypso/images/illustrations/illustration-start.svg';
				break;
		}

		return { headerText, mainText, buttonText, buttonHref, illustrationUrl };
	}

	render() {
		const { bannerType } = this.props;

		if ( 'placeholder' === bannerType ) {
			return this.placeholder();
		}

		const {
			headerText,
			mainText,
			buttonText,
			buttonHref,
			illustrationUrl,
		} = this.getBannerContent();

		const className = classnames( {
			'purchase-concierge': CONCIERGE_SUGGEST_PURCHASE_CONCIERGE === bannerType,
		} );

		return (
			<>
				<TrackComponentView eventName="calypso_purchases_concierge_banner_view" />
				<ActionCard
					headerText={ headerText }
					mainText={ mainText }
					buttonText={ buttonText }
					buttonIcon={ null }
					buttonPrimary={ true }
					buttonHref={ buttonHref }
					buttonTarget={ null }
					buttonOnClick={ () => {
						this.props.recordTracksEvent( 'calypso_purchases_concierge_banner_click', {
							referer: '/me/purchases',
						} );
					} }
					compact={ false }
					illustration={ illustrationUrl }
					classNames={ className }
				/>
			</>
		);
	}
}

export default localize( ConciergeBanner );
