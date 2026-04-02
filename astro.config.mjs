// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Notificator Project Docs',
			description: 'Documentation for the public-notify endpoint, including auth, examples, and OpenAPI reference.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/vagelisp/' }],
			sidebar: [
				{
					label: 'User Guide (No Code)',
					items: [
						{ label: 'Complete Workflow', slug: 'guides/workflow-overview' },
						{ label: 'Create Account', slug: 'guides/account-creation' },
						{ label: 'Create API Key (Mobile)', slug: 'guides/mobile-api-key-creation' },
						{ label: 'WordPress Plugin Setup', slug: 'guides/wordpress-plugin-setup' },
						{ label: 'App Settings Guide', slug: 'guides/app-settings' },
						{ label: 'Quick Start', slug: 'guides/quick-start' },
					],
				},
				{
					label: 'Developer Guide',
					items: [
						{ label: 'Overview', slug: '' },
						{ label: 'Code Samples', slug: 'guides/code-samples' },
						{ label: 'Plugin Template Creation', slug: 'guides/plugin-template-creation' },
						{ label: 'Plugin Hooks Notifications', slug: 'guides/plugin-hooks-notifications' },
						{ label: 'Copy-Paste Snippets', slug: 'guides/copy-paste-snippets' },
					],
				},
				{
					label: 'API Reference',
					items: [{ label: 'Public Notify API', slug: 'reference/public-notify' }],
				},
			],
		}),
	],
});
