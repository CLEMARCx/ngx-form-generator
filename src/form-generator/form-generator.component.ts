import { Component, OnInit, Input, NgZone, ContentChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Field } from './field';

@Component({
  selector: 'form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {

  @ContentChild(TemplateRef) parentTemplate;

  @Input() formBlueprint: any[];
  @Input() set formOptions(value: any) {
    this._formOptions = value;
    this.updateValues(this.formGroup);
  };

  public formGroup: FormGroup;
  public error: string;

  private _formOptions: any;

  constructor(private zone: NgZone) {

  }

  ngOnInit() {
    this.formGroup = new FormGroup({});

    this.formBlueprint.forEach((field, key) => {
      this.formBlueprint[key] = Object.assign(new Field(), field);

      if (field.type === 'group') {
        this.generateGroup(field, this.formBlueprint[key]);
      } else {
        this.generateField(field, this.formBlueprint[key], this.formGroup);
      }
    });
  }

  public submit() {
    this._formOptions.callback(this.formGroup, this.setError);
  }

  public setError = (error) => {
    this.zone.run(() => this.error = error);
  }

  public calcHeight(rows, height) {
    let calcHeight = rows * height;

    return { height: calcHeight + 'px' };
  }

  private generateGroup(field, data) {
    this.formGroup.addControl(field.name, new FormGroup({}));

    field.items.forEach((value, key) => {
      data[key] = Object.assign(new Field(), value);

      this.generateField(value, data[key], this.formGroup.get(field.name));
    });
  }

  private getValue(field) {
    let value: any;

    if (this._formOptions.values) {
      if (this._formOptions.values[field.name]) {
        value = this._formOptions.values[field.name];
      }
    }

    return value;
  }

  private updateValues(group) {
    if (group !== undefined) {
      for (let name in group.controls) {
        if (!group.controls.hasOwnProperty(name)) { continue; }

        let obj = group.get(name);

        obj.setValue(this.getValue({name: name}));
      }
    }
  }

  private generateField(field, data, group) {
    if (this._formOptions.items) {
      if (this._formOptions.items[field.name]) {
        field.items = this._formOptions.items[field.name];
      }
    }

    if (field.type !== 'button' && field.type !== 'timed-callback' && field.type !== 'group') {
      group.addControl(field.name,
        new FormControl({ value: this.getValue(field), disabled: data.disabled}, data.validators));
    }

    if (field.type === 'timed-callback') {
      this.formGroup.valueChanges.debounceTime(field.time).subscribe(() => {
        this.submit();
      });
    }
  }

}
