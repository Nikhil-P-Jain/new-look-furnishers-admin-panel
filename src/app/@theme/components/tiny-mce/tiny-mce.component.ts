import {
  Component,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "ngx-tiny-mce",
  template: "",
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {
  @Output() editorKeyup = new EventEmitter<any>();

  editor: any;

  constructor(
    private host: ElementRef,
    private locationStrategy: LocationStrategy
  ) {}

  ngAfterViewInit() {
    // tinymce.init({
    //   target: this.host.nativeElement,
    //   plugins: ["link", "paste", "table"],
    //   skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
    //   setup: (editor) => {
    //     this.editor = editor;
    //     editor.on("keyup", () => {
    //       this.editorKeyup.emit(editor.getContent());
    //     });
    //   },
    //   height: "320",
    // });
    tinymce.init({
      target: this.host.nativeElement,
      skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
      setup: function (editor) {
        editor.on("change", function (e) {
          editor.save();
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
