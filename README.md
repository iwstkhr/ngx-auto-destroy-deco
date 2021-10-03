# ngx-auto-destroy-deco

## Dependencies
* Angular 13

## Install
NOTE: Replace `x.x.x` with the version.

```
$ cd $YOUR_APP_PATH
$ curl -OL https://github.com/iwstkhr/ngx-auto-destroy-deco/raw/main/iwstkhr-ngx-auto-destroy-deco-x.x.x.tgz
$ npm add iwstkhr-ngx-auto-destroy-deco-x.x.x.tgz
```

## Usage
Just add:
1. `@AutoDestroy` decorator
2. Class field used for `takeUntil` notifier

```ts
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
})
@AutoDestroy()
export class SampleComponent implements OnInit {
  private readonly onDestroy$ = new Subject<void>();

  ngOnInit() {
    interval(1000).pipe(
      takeUntil(this.onDestroy$),
    );
  }
}
```

## License
MIT
