# {{title}}

{{description}}

## API Endpoints

{{#each paths}}
### {{@key}}
{{#each this}}
#### {{@key}}
{{#if summary}}
**Summary:** {{summary}}
{{/if}}
{{#if description}}
**Description:** {{description}}
{{/if}}

**Parameters:**
{{#if parameters}}
{{#each parameters}}
- **{{name}}** ({{in}})
  - Type: {{type}}
  {{#if required}}- Required: {{required}}{{/if}}
  {{#if description}}- Description: {{description}}{{/if}}
{{/each}}
{{else}}
None
{{/if}}

**Responses:**
{{#each responses}}
- **{{@key}}**: {{description}}
{{/each}}

{{/each}}
{{/each}}
