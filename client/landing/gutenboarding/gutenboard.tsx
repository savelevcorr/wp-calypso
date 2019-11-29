/**
 * External dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary
import { __ } from '@wordpress/i18n';
import {
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
	KeyboardShortcuts,
} from '@wordpress/components';
import { createBlock, registerBlockType, BlockInstance } from '@wordpress/blocks';
import { rawShortcut, displayShortcut, shortcutAriaLabel } from '@wordpress/keycodes';
import '@wordpress/format-library';
import classnames from 'classnames';
import React, { useState } from 'react';
import '@wordpress/components/build-style/style.css';
import * as RR from 'react-router-dom';

/**
 * Internal dependencies
 */
import Header from './components/header';
import { name, settings } from './onboarding-block';
import { Slot as SidebarSlot } from './components/sidebar';
import SettingsSidebar from './components/settings-sidebar';
import './stores/domain-suggestions';
import './stores/onboard';
import './stores/verticals-templates';
import './style.scss';

// Copied from https://github.com/WordPress/gutenberg/blob/c7d00c64a4c74236a4aab528b3987811ab928deb/packages/edit-post/src/keyboard-shortcuts.js#L11-L15
// to be consistent with Gutenberg's shortcuts, and in order to avoid pulling in all of `@wordpress/edit-post`.
const toggleSidebarShortcut = {
	raw: rawShortcut.primaryShift( ',' ),
	display: displayShortcut.primaryShift( ',' ),
	ariaLabel: shortcutAriaLabel.primaryShift( ',' ),
};

registerBlockType( name, settings );
registerBlockType( 'a8c/redir', {
	title: 'boom',
	category: 'layout',
	attributes: { to: { type: 'string' } },
	edit: ( { attributes } ) => {
		return <RR.Redirect to={ attributes.to } />;
	},
} );

registerBlockType( 'a8c/under-construction', {
	title: 'boom2',
	category: 'layout',
	attributes: {},
	edit: () => {
		return (
			<>
				<RR.Link to="/">Back</RR.Link>
				<svg width="320pt" height="320pt" viewBox="0 0 320 320">
					<path
						fill="#ffff02"
						stroke="#ffff02"
						d=" M 130.9 25.8 C 139.7 17.1 152.6 11.9 165.0 14.1 C 174.7 14.8 183.5 20.1 190.2 26.8 C 224.5 61.2 258.9 95.5 293.2 129.9 C 296.5 134.3 300.4 138.6 302.1 144.0 C 305.2 150.8 305.1 158.6 304.2 165.9 C 303.3 174.4 297.9 181.3 292.4 187.4 C 256.7 223.0 221.0 258.7 185.4 294.4 C 182.8 296.7 179.6 297.9 176.6 299.5 C 171.6 302.5 165.5 302.3 160.0 303.6 C 155.1 302.5 150.1 302.3 145.4 300.5 C 141.5 298.5 137.3 297.0 134.1 293.9 C 99.6 259.3 65.1 224.9 30.6 190.4 C 27.1 187.2 24.3 183.3 21.2 179.6 C 15.0 171.0 14.4 159.9 15.9 149.8 C 17.7 142.0 22.2 135.3 27.3 129.3 C 61.9 94.8 96.3 60.3 130.9 25.8 Z"
						style={ { stroke: 'black', strokeWidth: 12, strokeLinecap: 'round' } }
					/>
					<circle cx={ 168 } cy={ 100 } r={ 14 } fill="#000" />

					<path
						fill="#010102"
						stroke="#010102"
						d=" M 101.1 117.8 C 102.1 114.3 103.3 110.5 106.7 108.6 C 117.2 108.7 127.6 108.7 138.0 108.7 C 140.1 108.6 142.1 109.1 144.1 109.5 C 148.2 116.1 153.2 122.1 157.5 128.6 C 159.7 131.9 161.8 136.1 159.8 140.0 C 154.0 150.7 148.0 161.3 142.3 172.1 C 155.4 181.7 167.5 192.5 180.6 202.0 C 184.4 197.9 189.2 193.4 195.2 194.8 C 197.4 195.6 200.0 195.9 201.6 197.7 C 203.7 200.0 205.5 202.6 206.9 205.4 C 209.0 204.4 211.7 204.0 213.8 205.2 C 217.4 207.5 219.2 211.9 219.3 216.0 C 221.5 217.0 223.3 218.4 224.5 220.4 C 230.1 220.0 234.4 224.1 236.6 228.8 C 211.7 229.0 186.9 228.7 162.0 229.1 C 155.9 228.5 149.7 229.6 143.5 228.7 C 144.8 227.2 145.9 225.5 147.0 223.8 C 149.9 222.5 152.9 221.1 156.2 221.1 C 157.9 220.7 159.6 220.1 158.8 217.9 C 160.5 215.3 162.7 212.4 166.3 213.1 C 168.2 209.3 171.3 206.3 175.0 204.2 C 163.8 195.0 152.5 186.0 141.3 176.8 C 140.8 175.5 139.1 176.4 139.5 177.4 C 142.0 180.1 144.9 183.1 144.7 187.0 C 144.9 189.5 143.1 191.6 142.2 193.8 C 139.3 200.7 135.1 207.1 131.8 213.8 C 129.8 218.0 127.6 222.2 125.2 226.2 C 122.6 228.2 118.7 229.6 115.5 228.1 C 113.5 226.6 112.3 224.3 111.6 222.0 C 113.6 214.7 117.9 208.5 120.7 201.5 C 122.9 196.7 125.4 192.0 127.7 187.3 C 121.8 180.0 116.0 172.6 109.8 165.5 C 109.7 172.9 110.1 180.4 109.7 187.8 C 106.8 199.4 103.6 211.0 100.6 222.7 C 99.7 227.6 92.9 230.3 88.9 227.0 C 85.3 225.1 86.1 220.6 86.3 217.2 C 88.6 207.8 91.0 198.5 93.3 189.1 C 93.7 177.9 93.1 166.7 93.6 155.5 C 93.6 151.0 98.2 149.3 100.4 146.1 C 98.0 145.3 96.3 143.3 96.4 140.8 C 94.1 139.2 92.0 137.3 89.5 136.0 C 88.5 133.9 89.9 132.2 91.8 131.5 C 93.5 133.1 95.4 134.5 97.3 135.7 C 98.6 129.8 99.7 123.8 101.1 117.8 Z"
					/>
					<path
						fill="#ffff02"
						stroke="#ffff02"
						d=" M 113.0 123.3 C 116.6 123.4 120.1 123.4 123.6 123.4 C 119.3 128.0 114.4 132.1 110.3 136.9 C 110.8 132.3 112.1 127.9 113.0 123.3 Z"
					/>
					<path
						fill="#ffff02"
						stroke="#ffff02"
						d=" M 122.7 156.0 C 128.2 153.5 133.7 151.2 139.2 148.7 C 137.2 153.8 133.8 158.0 131.8 163.0 C 128.6 160.8 125.5 158.6 122.7 156.0 Z"
					/>
				</svg>
			</>
		);
	},
} );

const onboardingBlock = createBlock( name, {} );
const redirect = createBlock( 'a8c/redir', { to: '/' } );
const uc = createBlock( 'a8c/under-construction', {} );

export function Gutenboard() {
	const r = RR.useRouteMatch( '*' );

	let content: BlockInstance;
	switch ( r?.url ) {
		case '/':
			content = onboardingBlock;
			break;

		case '/fse':
			content = uc;
			break;

		default:
			content = redirect;
	}

	const [ isEditorSidebarOpened, updateIsEditorSidebarOpened ] = useState( false );

	const toggleGeneralSidebar = () => updateIsEditorSidebarOpened( isOpen => ! isOpen );

	/* eslint-disable wpcalypso/jsx-classname-namespace */
	return (
		<div className="block-editor__container">
			<SlotFillProvider>
				<DropZoneProvider>
					<div
						className={ classnames( 'edit-post-layout', {
							'is-sidebar-opened': isEditorSidebarOpened,
						} ) }
					>
						<KeyboardShortcuts
							bindGlobal
							shortcuts={ {
								[ toggleSidebarShortcut.raw ]: toggleGeneralSidebar,
							} }
						/>
						<Header
							isEditorSidebarOpened={ isEditorSidebarOpened }
							toggleGeneralSidebar={ toggleGeneralSidebar }
							toggleSidebarShortcut={ toggleSidebarShortcut }
						/>
						<BlockEditorProvider value={ [ content ] } settings={ { templateLock: 'all' } }>
							<div className="edit-post-layout__content">
								<div
									className="edit-post-visual-editor editor-styles-wrapper"
									role="region"
									aria-label={ __( 'Onboarding screen content' ) }
									tabIndex={ -1 }
								>
									<WritingFlow>
										<ObserveTyping>
											<BlockList className="gutenboarding-block-list" />
										</ObserveTyping>
									</WritingFlow>
								</div>
							</div>
							<div>
								<SettingsSidebar isActive={ isEditorSidebarOpened } />
								<SidebarSlot />
							</div>
						</BlockEditorProvider>
					</div>
				</DropZoneProvider>
			</SlotFillProvider>
			<Popover.Slot />
		</div>
	);
	/* eslint-enable wpcalypso/jsx-classname-namespace */
}
