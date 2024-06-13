// eslint-disable-next-line @typescript-eslint/ban-ts-comment
///@ts-nocheck installing types???
import ImageTool from '@editorjs/image';

export class CustomImageTool extends ImageTool {
  constructor(props) {
    super(props);
    this.config.actions = this.config.actions.map((a) => {
      return {
        ...a,
        action: a.action.bind(this),
      };
    });
  }
}
