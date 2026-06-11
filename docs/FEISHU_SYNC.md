# Feishu Sync Map

This file records the Feishu Wiki space and node mapping for repeatable sync.

## Space

| Field | Value |
| --- | --- |
| Name | Elegant Developer Studio｜个人主页项目知识库 |
| Space ID | `7650170980995697842` |
| Root navigation node | `UYrLwuB1AieALIk9VKOcnLzqnwb` |
| Root navigation doc | `KCW7dozh6oGfDnx7wk3cyn98nId` |
| Root navigation URL | `https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb` |

## Node Map

| Page | Local source | Wiki node | Doc token | URL |
| --- | --- | --- | --- | --- |
| 00｜项目导航首页 | `docs/FEISHU_INDEX.md` | `UYrLwuB1AieALIk9VKOcnLzqnwb` | `KCW7dozh6oGfDnx7wk3cyn98nId` | https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb |
| 01｜项目地图 Project Map | `docs/PROJECT_MAP.md` | `PG7ew3DRviyumekYTSec9n4znWf` | `V3fTd13AjoI98AxNiwrcA6pFnMd` | https://scnlb1lk96sb.feishu.cn/wiki/PG7ew3DRviyumekYTSec9n4znWf |
| 02｜PRD 与产品定义 | `docs/PRD.md` | `K71jwiNDeiq1WBkmAxfcQkDKnWe` | `WGN4dVuEPonFpmxOEgycGKelnHg` | https://scnlb1lk96sb.feishu.cn/wiki/K71jwiNDeiq1WBkmAxfcQkDKnWe |
| 03｜路线图与阶段计划 | `docs/ROADMAP.md` | `TwvowNrUpiTyFekUU5mcJ4vBn2f` | `HUUzdcT97oqlYXxWbhnc0Tj2ngh` | https://scnlb1lk96sb.feishu.cn/wiki/TwvowNrUpiTyFekUU5mcJ4vBn2f |
| 04｜信息架构 IA | `docs/INFORMATION_ARCHITECTURE.md` | `H8O7wIK0pibqivk6SIAcp72Xnob` | `CQwGdvs8Bo9RQ0xz2z2cILN3nFb` | https://scnlb1lk96sb.feishu.cn/wiki/H8O7wIK0pibqivk6SIAcp72Xnob |
| 05｜设计系统 Design System | `docs/DESIGN_SYSTEM.md` | `HrgcweuFCiL5E8kOdQPcOsXtnyg` | `DHzvdCwnzoS2NSxc9bXcfPrZnKd` | https://scnlb1lk96sb.feishu.cn/wiki/HrgcweuFCiL5E8kOdQPcOsXtnyg |
| 06｜开发进度 Progress Log | `docs/PROGRESS_LOG.md` | `CKEKwH6vriYZMOkyPnDcDMvYn1d` | `WIu3dCr7AoUnkXxHqtAcDMjqnwA` | https://scnlb1lk96sb.feishu.cn/wiki/CKEKwH6vriYZMOkyPnDcDMvYn1d |
| 07｜决策记录 ADR | `docs/DECISIONS.md` | `D67twGhp5izbt1kk7olc6TyunZf` | `DsUEd7yA2oYyJcx3jQ3csOUenkh` | https://scnlb1lk96sb.feishu.cn/wiki/D67twGhp5izbt1kk7olc6TyunZf |
| 08｜版本追溯 Version Trace | `docs/VERSION_TRACE.md` | `G8nwwns5ii1JZtkw77GcB5Y0nob` | `BryQdzxSYo7EEEx0fOVcaawUnec` | https://scnlb1lk96sb.feishu.cn/wiki/G8nwwns5ii1JZtkw77GcB5Y0nob |
| 09｜质量验收 Design QA | `design-qa.md` | `HLO5waemhiXD24kyfuXc7WXFnGe` | `XH7LdiZmHoRY0BxRIDicFqeNnwh` | https://scnlb1lk96sb.feishu.cn/wiki/HLO5waemhiXD24kyfuXc7WXFnGe |
| 10｜素材与参考 Assets | `docs/ASSETS_REFERENCE.md` | `BTdhw9uB9iLBuik767Gcjiv7nUb` | `XrE5d5QQIonKp3xVXrrcdsskneg` | https://scnlb1lk96sb.feishu.cn/wiki/BTdhw9uB9iLBuik767Gcjiv7nUb |
| 11｜执行复核 Review | `docs/EXECUTION_REVIEW.md` | `VkYEwYWeli09ZTkDtxYchYyHn1f` | `O55Hd84DUoYCq2xMKNJcbQTBnmd` | https://scnlb1lk96sb.feishu.cn/wiki/VkYEwYWeli09ZTkDtxYchYyHn1f |
| 12｜同步协议 Sync Map | `docs/FEISHU_SYNC.md` | `KJT5wmMo7iWpInk2XgMcw9NhnXe` | `OboHdJiORoKPqvxS0HOcaoDLn5f` | https://scnlb1lk96sb.feishu.cn/wiki/KJT5wmMo7iWpInk2XgMcw9NhnXe |

## Sync Protocol

1. Update local Markdown first.
2. Commit local changes.
3. Push to GitHub.
4. Update corresponding Feishu document with `docs +update --command overwrite`.
5. Fetch the Feishu document and verify critical text.
6. Update this map if any node or doc token changes.

## Inserted Media

| Page | Asset | Block ID | File token | Note |
| --- | --- | --- | --- | --- |
| 10｜素材与参考 Assets | `public/references/developer-atelier-reference.png` | `doxcnZpg0lEWd60pKkRLyozv7bf` | `Pn2Qb798goaiIFxoHtccg2rJnXe` | Accepted Phase 1 visual reference |
| 10｜素材与参考 Assets | `public/assets/lumen-design-system.png` | `doxcnor85y2bJLAbM8k0dhpv6Ue` | `ULLPb75utoRZ4exkaDNczOzsnJf` | Project card image |
| 10｜素材与参考 Assets | `public/assets/morning-studio-desk.png` | `doxcnpVSVo25Wu3GsYr5BTCnPIc` | `AlUtb2trAoNofoxqrKbca3imnHh` | Media image |

Important:

- `docs +update --command overwrite` removes existing media blocks.
- Reinsert these images after overwriting the Assets page.

## Command Pattern

```bash
lark-cli docs +update \
  --api-version v2 \
  --as user \
  --doc '<doc_token>' \
  --command overwrite \
  --doc-format markdown \
  --content @docs/PROJECT_MAP.md
```
