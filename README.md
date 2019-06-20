# Ng8Select

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Instructions

注意：使用前需在自己的模块中，先引入Ng8SelectModule

```
/**
 * 使用方法：
 * @param：optionList 传入需要显示的下拉列表
 * @param：ngValue 绑定的需要显示的列表值
 * @param：selectValueAndName 传入需要显示的列表内容对象的名称和列表值的下标，
 *         传入字符创例如”10“，表示获取对象的第1项为显示的内容，第0项为要获取value值
 * @param: name 标识db-select和db-select-option为一对组合，取值必须相等
 * @param: disabled 禁用下拉列表
 */

//示例用法如下：

<ng8-select placeholder='-请选择内容1' [optionList]="tempSelectList" [(ngModel)]="tempSelectValue" (ngModelChange)="getTempSelectValue($event)" name="testSelect" required #TestSelect="ngModel">
      <ng8-select-option *ngFor="let item of tempSelectList;index as i" [ngValue]="item.value" name="testSelect">{{item.name}}</ng8-select-option>
</ng8-select>
```

## 更新说明
> version 1.1.0
去掉引入的jquery，加入下拉列表输入框样式




## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# ng8-select
