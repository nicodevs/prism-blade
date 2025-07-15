# Prism Blade

Blade Language syntax highlighting for Prism.

- [GitHub](https://github.com/nicodevs/prism-blade)
- [NPM](https://www.npmjs.com/package/prism-blade)

### Installation

```sh
npm i prism-blade
```

### Usage

```js
import Prism from 'prismjs';
import 'prism-blade';

const code = `@include('header')`;
const html = Prism.highlight(code, Prism.languages.blade, 'blade');
```

### Preview

#### Interpolation

```blade
Hello, {{ $name }}.
The current UNIX timestamp is {{ time() }}.
Your favorite color is {{ Auth::user()->getFavorite('color') }}.
```

#### Interpolations in attribute values

```blade
<link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">
<body class="{{ isDark ? 'dark' : 'light' }}">Hi!</body>
```

#### Unscaped interpolation

```blade
{!! Auth::user()->name !!}
```

#### Comments

```blade
{{-- This is a comment --}}
```

#### Directives

```blade
@extends('layouts.app')
@section('title', 'Dashboard')
@json(['user' => Auth::user(), 'notifications' => $notifications])

@can('edit-posts')
    <p>You can edit posts.</p>
@elsecan('view-posts')
    <p>You can view posts.</p>
@else
    <p>Access denied.</p>
@endcan
```

#### Components

```blade
<x-alert
    type="error"
    :name="auth()->user()->name"
    :message="$message->getMessage()" />

<x-inputs.button/>
```

#### Scripts and style blocks

```blade
<style>
    .card { color: red; }
</style>
@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Loaded');
        });
    </script>
@endpush
```

#### @php directive

```blade
@php
    $userRole = Auth::user()->role;
@endphp
```

#### @verbatim directive

```blade
<html>
    @verbatim
        This will not be parsed as Blade: {{ foo }}
        <!-- A comment -->
        <script>console.log('Bar');</script>
    @endverbatim
</html>
```
