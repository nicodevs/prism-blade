import { describe, expect, it } from 'vitest';
import Prism from 'prismjs';
import '../src/index.mjs';

// Helper to highlight Blade code
function highlightBlade(code) {
  return Prism.highlight(code, Prism.languages.blade, 'blade');
}

describe('Blade syntax highlighting', () => {
  it('should highlight comments', () => {
    const code = `{{-- resources/views/dashboard.blade.php --}}`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight directives', () => {
    const code = `@auth`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight directives with parameters', () => {
    const code = `@extends('layouts.app')`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight directives parameters as PHP', () => {
    const code = `@json(['user' => Auth::user(), 'notifications' => $notifications])`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight contents of the php directive as PHP', () => {
    const code = `@php
      $userRole = Auth::user()->role;
    @endphp`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight Blade interpolations', () => {
    const code = `<ul foo="bar">
        <li>Email: {{ Auth::user()->email }}</li>
        <li>Role: {{ $userRole }}</li>
    </ul>`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight Blade interpolations in attribute values', () => {
    const code = `<link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight unscaped Blade interpolations', () => {
    const code = `{!! Auth::user()->name !!}`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight components with attributes and shorthands', () => {
    const code = `<x-alert type="error" :name="auth()->user()->name" :message="$message->getMessage()" />`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should highlight scripts and style blocks', () => {
    const code = `@push('scripts')
        <style>
            .card { color: red; }
        </style>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                console.log('Loaded');
            });
        </script>
    @endpush`;
    expect(highlightBlade(code)).toMatchSnapshot();
  });

  it('should parse {{ and }} as token symbol', () => {
    const code = `{{ Auth::user()->email }}`;
    const highlighted = highlightBlade(code);
    expect(highlighted).toContain('<span class="token symbol symbol">{{</span>');
    expect(highlighted).toContain('<span class="token symbol symbol">}}</span>');
  });

  it('should parse {!! and !!} as token symbol', () => {
    const code = `{!! Auth::user()->name !!}`;
    const highlighted = highlightBlade(code);
    expect(highlighted).toContain('<span class="token symbol symbol">{!!</span>');
    expect(highlighted).toContain('<span class="token symbol symbol">!!}</span>');
  });

  it('should not highlight as Blade the contents of @verbatim', () => {
    const code = `<html>
        @verbatim
            Name of javascript {{ name }}
            Type of appliation {{ type }}
            <!-- and few more like these -->

            <script>console.log('Loaded');</script>
        @endverbatim
    </html>`;
    const highlighted = highlightBlade(code);
    expect(highlighted).toMatchSnapshot();
    expect(highlighted).toContain('Type of appliation {{ type }}');
    expect(highlighted).toContain('<span class="token comment">');
  });
});
