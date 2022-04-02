import { Subject } from 'rxjs';

/**
 * Class Decorator which executes onDestroy$.next() when ngOnDestroy called
 *
 * @example
 * ```ts
 * \@Component({
 *   selector: 'app-sample',
 *   templateUrl: './sample.component.html',
 *   styleUrls: ['./sample.component.scss'],
 * })
 * \@AutoDestroy()
 * export class SampleComponent implements OnInit {
 *   private readonly onDestroy$ = new Subject<void>();
 *
 *   ngOnInit() {
 *     interval(1000).pipe(
 *       takeUntil(this.onDestroy$),
 *     );
 *   }
 * }
 * ```
 *
 * @constructor
 */
/* eslint-disable-next-line arrow-body-style */
export const AutoDestroy = (): ClassDecorator => {
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  return (constructor: Function) => {
    const ngOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function(...args: any[]) {
      const onDestroy$ = this.onDestroy$;
      if (onDestroy$ instanceof Subject) {
        onDestroy$.next(undefined);
      } else {
        console.warn(`${constructor.name} has no onDestroy$.`);
      }

      // Call an original ngOnDestroy if any
      ngOnDestroy && ngOnDestroy.apply(this, args);
    };
  };
};
