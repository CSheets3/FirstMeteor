import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
        const userID = Random.id();
        let taskId;

        beforeEach(() => {
            Tasks.remove.apply({});
            taskId = Tasks.insert({
                text: 'test task',
                createdAt: new Date,
                username: 'tmeasday',
            });
        });

      it('can delete owned task', () => {
          const deleteTask = Meteor.isServer.method_handlers['tasks.remove'];

          const invocation = { userId };

          deleteTask.apply(invocation, [taskId]);

          assert.equal(Tasks.find().count(),0);
      });
    });
  });
}