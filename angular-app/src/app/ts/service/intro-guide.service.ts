import {Injectable} from '@angular/core';
import * as introJs from 'intro.js/intro';

@Injectable()
export class IntroGuideService {

  introJS = introJs();

  constructor() {
  }

  // when first user time add income or expense item, show how can edit or delete it.
  showItemEditGuide(itemElementId: string) {
    const introSteps = this.getFirstItemSteps(itemElementId);
    const introOptions = this.getFirstItemOptions(introSteps);

    this.introJS.setOptions(introOptions);
    setTimeout(() => {
      this.introJS.start();
    }, 2000);
  }

  // show welcome user guide on auto login
  showWelcomeGuide(userName: string) {
    const introSteps = this.getUserIntroSteps(userName);
    const introOptions = this.getUserIntroOptions(introSteps);

    this.introJS.setOptions(introOptions);
    this.introJS.start();
  }


  private getUserIntroOptions(introSteps: Array<object>): object {
    return {
      steps: introSteps,
      showProgress: true,
      skipLabel: 'Exit',
      doneLabel: 'Thank you',
      overlayOpacity: '0.2',
      disableInteraction: true,
      showStepNumbers: false,
      exitOnEsc: false,
      exitOnOverlayClick: false,
      scrollToElement: true,
      scrollTo: 'tooltip'
    };
  }

  private getFirstItemOptions(introSteps: Array<object>): object {
    return {
      steps: introSteps,
      showProgress: false,
      doneLabel: 'Okay',
      overlayOpacity: '0.2',
      disableInteraction: true,
      showStepNumbers: false,
      exitOnEsc: false,
      exitOnOverlayClick: false,
      scrollToElement: true,
      scrollTo: 'tooltip'
    };
  }

  private getFirstItemSteps(itemElementId: string): Array<object> {
    return [{
      element: '#' + itemElementId,
      intro: 'Click on item to toggle edit and delete options.',
      position: 'bottom'
    }];
  }


  private getUserIntroSteps(userName: string): Array<object> {
    return [{
      intro: `Hello ${userName}, Welcome to Budget Manager.`,
    }, {
      element: '#step1',
      intro: 'Here you can see the overview of your budget.',
      position: 'bottom'
    }, {
      element: '#step2',
      intro: 'Here, you can add new income or expense item, or edit the existing one.',
      position: 'top'
    }, {
      element: '#step4',
      intro: 'A list of all income item.',
      position: 'left'
    }, {
      element: '#step5',
      intro: 'A list of all expense item.',
      position: 'right'
    }, {
      element: '#step2',
      intro: 'Now, let\'s start with adding new income or expense details. Enjoy!',
      position: 'bottom'
    }];
  }

}
