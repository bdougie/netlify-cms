import React from 'react';
import { ScrollSync, ScrollSyncPane } from '../ScrollSync';
import Toolbar from './EntryEditorToolbar';
import Button from 'react-toolbox/lib/button';
import ControlPane from '../ControlPanel/ControlPane';

const ShowOnlyEditor = ({
  collection,
  entry,
  fields,
  fieldsMetaData,
  fieldsErrors,
  getAsset,
  onChange,
  onValidate,
  onAddAsset,
  onRemoveAsset,
  onCancelEdit,
  styles,
  controlPaneRef,
  controlClassName,
  handleTogglePreview,
  handleOnPersist,
}) => (
  <div className={styles.root}>
    <ScrollSync>
      <div className={styles.container}>
        <ScrollSyncPane>
          <div className={controlClassName}>
            <Button style={{ 'margin-left': '80vw' }} onClick={handleTogglePreview}>
                OPEN PREVIEW
              </Button>
            <ControlPane
              collection={collection}
              entry={entry}
              fields={fields}
              fieldsMetaData={fieldsMetaData}
              fieldsErrors={fieldsErrors}
              getAsset={getAsset}
              onChange={onChange}
              onValidate={onValidate}
              onAddAsset={onAddAsset}
              onRemoveAsset={onRemoveAsset}
              ref={c => controlPaneRef = c}
            />

          </div>
        </ScrollSyncPane>
      </div>
    </ ScrollSync>
    <div className={styles.footer}>
      <Toolbar
        isPersisting={entry.get('isPersisting')}
        onPersist={handleOnPersist}
        onCancelEdit={onCancelEdit}
      />
    </div>

  </div>
  );

export default ShowOnlyEditor;
